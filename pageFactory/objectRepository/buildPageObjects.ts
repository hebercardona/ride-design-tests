export class BuildPageObjects {
    protected static SEAT_CATEGORIES = 'button.wholegood-models-card:not(.redirectCard)';
    protected static MODEL_CATEGORIES = 'div.wholegood-models-card:not(.node-disabled)';
    protected static TRIMS = 'div.trim-models-card i.shapes-arrow';
    protected static PC_LOADED = '.grab';
    protected static CANVAS_LOADED = '.grab';
    protected static HUR_GDY_CANVAS_GRAB = '#render-container canvas.grab';
    protected static CANVAS_DEFAULT_CURSOR = '.defaultCursor';
    protected static FOOTER_NEXT = 'a.cpq-footer__cta-button';
    protected static OPEN_SUMMARY = 'button.cpq-footer__cta-button';
    protected static GET_QUOTE = 'button.cpq-footer__cta-button';
    protected static RADIAL_PROGRESS = 'div.radial-progress';
    protected static FOOTER_SPINNER_LOADING = 'div.cpq-footer__spinner-loading';
    protected static FOOTER_SPINNER_WRAPPER = 'div.cpq-footer__cta div.spinner-wrapper';
    protected static FOOTER_SPINNER_LOADER_TEXT = 'div.cpq-footer__cta div.loader-text';
    protected static CATEGORIES = 'a.wholegood-models-card';
    protected static SUBSTEP_RADIO = 'input.radio';
    protected static SUBSTEP_ITEM_TITLE = 'div.substep-options-title-items-input-label-container >> visible=true';
    protected static SUBSTEP_ITEMS = 'section.substep-options-title-items-item >> visible=true';
    protected static SUBSTEP_TITLE = 'section.substep-options-title >> visible=true';
    protected static SUBSTEP_TEXT = 'button.substep-options-title-heading span >> visible=true';
    protected static SUBSTEP_SECTION = 'section.substep-options';
    protected static SUBSTEP_SPINNER_LOADER = 'div.spinner-wrapper div.loader >> visible=true';
    protected static COLOR_ITEMS = 'div.wholegood-colors-items-item-row radio';
    protected static SAVE_BUILD_TEXT = 'div.build-variant__save-build-text';
    protected static FOOTER_CTA_SPINNER_LOADING = 'div.cpq-footer__spinner-loading';
    protected static FOOTER_LOGO_CONTAINER = 'div.cpq-footer__brand-logo-container';
    protected static SNO_SIDE_PANEL_SECTION = 'section.color-section-title >> nth=0';
    protected static SNO_TUNNEL_SECTION = 'section.color-section-title >> nth=1';
    protected static SNO_RAIL_SECTION = 'section.color-section-title >> nth=2';
    protected static SNO_COLORS_WATCHES = 'button:not([disabled])';
    protected static SNO_STOCK_LABEL = `div.model-family-info:has(translate:has-text('Stock'))`;
    protected static AVAILABLE_LAYOUT_ITEM = 'li.wholegood-layout-items-item:not(:has(div.wholegood-layout-items-item-render-unavailable)) div.wholegood-layout-items-item-content-title';
    protected static LAYOUT_ITEMS = 'li.wholegood-layout-items-item';
    protected static RENDER_UNAVAILABLE = 'div.wholegood-layout-items-item-render-unavailable';
    protected static EMOTION_ICON_FEEDBACK_CLOSE = `button[class*='MinimizedWidgetMessage__close']`;
    protected static RENDER_UNAVAILABLE_DIALOG = '#render-unavailable-dialog-content';
    protected static RENDER_UNAVAILABLE_CLOSE = 'button.render-unavailable__header-close';
    protected static RENDER_UNAVAILABLE_DIFFERENT_LAYOUT = 'button.render-unavailable__btn-layout-different';
    protected static CANVAS_RENDER_CONTAINER = '#render-container';
}