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
    const sidebar = HtmlService.createTemplateFromFile("Sidebar").evaluate();
    sidebar.setTitle("Concept");
    DocumentApp.getUi().showSidebar(sidebar);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Used to include CSS and JS separately from HTML
 */
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}

// TODO test and see if the natural language api is more accurate with individual paragraphs
function getAllParagraphs() {
    return DocumentApp.getActiveDocument().getBody().getParagraphs();
}

// noinspection JSUnusedGlobalSymbols
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
        encodingType: "UTF16"
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