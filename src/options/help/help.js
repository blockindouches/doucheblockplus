// noinspection JSUnresolvedVariable,JSUnresolvedFunction

import DOMPurify from 'dompurify';
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
        
        const cleanWords = DOMPurify.sanitize(Help.translate('configuring_words'));
        Help.getElement('keywords').innerHTML = cleanWords;
        
        const cleanAllowedWords = DOMPurify.sanitize(Help.translate('configuring_allowed_words'));
        Help.getElement('allowedKeywords').innerHTML = cleanAllowedWords;
        
        const cleanWhitelist = DOMPurify.sanitize(Help.translate('whitelist_help'));
        Help.getElement('whitelist').innerHTML = cleanWhitelist;
    }
}
