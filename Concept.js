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

// noinspection JSUnusedGlobalSymbols
function createAnnotationRequest() {
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
            classifyText: DocumentApp.getActiveDocument().getBody().getText().length >= 20,
        },
        encodingType: "UTF16"
    };

    return [payload, {
        "Authorization": `Bearer ${ScriptApp.getOAuthToken()}`,
        "Content-Type": "application/json"
    }];
}

/**
 * Sets the user's cursor position to the specified offset relative to the entire document.
 *
 * @param offset the offset of the text in the document's body
 * @param text the text that will be selected
 */
function setSelectionByOffset(offset, text) {
    const body = DocumentApp.getActiveDocument().getBody().editAsText();
    const rangeBuilder = DocumentApp.getActiveDocument().newRange();
    rangeBuilder.addElement(body, offset, offset + text.length - 1);

    DocumentApp.getActiveDocument().setSelection(rangeBuilder.build());
}