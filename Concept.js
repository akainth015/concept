/**
 * @OnlyCurrentDoc
 *
 * Notify the authorization platform that this add-on is scoped to this document
 */

// noinspection JSUnusedGlobalSymbols
/**
 * Create the "Analyze" menu entry, and bind it to openSidebar
 */
function onOpen() {
    DocumentApp.getUi()
        .createAddonMenu()
        .addItem("Analyze", 'showSidebar')
        .addToUi();
}

/**
 * Show the sidebar to the user (only works with the regular add-on, not the mobile version)
 */
function showSidebar() {
    const sidebar = HtmlService.createHtmlOutputFromFile("Sidebar");
    sidebar.setTitle("Concept");
    DocumentApp.getUi().showSidebar(sidebar);
}

/**
 * Used to include CSS and JS separately from HTML
 */
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}

function runAnalysis() {
    const payload = {
        document: {
            type: "PLAIN_TEXT",
            language: DocumentApp.getActiveDocument().getLanguage(),
            content: DocumentApp.getActiveDocument().getBody().getText()
        },
        features: {
            extractSyntax: true,
            extractEntities: true,
            extractDocumentSentiment: true,
            extractEntitySentiment: true,
            classifyText: true,
        },
    };

    const annotationsResponse = UrlFetchApp.fetch("https://language.googleapis.com/v1/documents:annotateText", {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
        headers: {
            "Authorization": `Bearer ${ScriptApp.getOAuthToken()}`
        }
    });
    let annotationsText = annotationsResponse.getContentText();
    return JSON.parse(annotationsText);
}