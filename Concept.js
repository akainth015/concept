/**
 * @OnlyCurrentDoc
 *
 * Notify the authorization platform that this add-on is scoped to this document
 */

/**
 * Create the "Analyze" menu entry, and bind it to openSidebar
 */
function onOpen(e) {
    DocumentApp.getUi()
        .createAddonMenu()
        .addItem("Analyze", 'openSidebar')
        .addToUi();
}

/**
 * Show the sidebar to the user (only works with the regular add-on, not the mobile version)
 */
function openSidebar() {
    const sidebar = HtmlService.createHtmlOutputFromFile("Sidebar");
    sidebar.setTitle("Concept");
    DocumentApp.getUi().showSidebar(sidebar);
}