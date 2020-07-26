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
        .addItem("Analyze", 'runAnalysis')
        .addToUi();
}

/**
 * Show the sidebar to the user (only works with the regular add-on, not the mobile version)
 */
function runAnalysis() {
    const sidebar = HtmlService.createHtmlOutputFromFile("Sidebar");
    sidebar.setTitle("Concept");
    DocumentApp.getUi().showSidebar(sidebar);
}