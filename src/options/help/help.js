// noinspection JSUnresolvedVariable,JSUnresolvedFunction

import DOMPurify from '../modules/dompurify';
import Page from '../page';

/**
 * User help page with FAQ/instructions type stuff.
 *
 * @module
 * @name HelpPage
 */
export default class Help extends Page {

    /**
     * @ignore
     */
    constructor() {
        super('help');
        Help.getElement('keywords').innerHTML = DOMPurify.sanitize(Help.translate('configuring_words'));
        Help.getElement('allowedKeywords').innerHTML = DOMPurify.sanitize(Help.translate('configuring_allowed_words'));
        Help.getElement('whitelist').innerHTML = DOMPurify.sanitize(Help.translate('whitelist_help'));
    }
}
