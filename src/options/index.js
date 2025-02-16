// noinspection JSUnresolvedVariable,JSUnresolvedFunction

import Storage from '../modules/storage';
import Tabs from '../modules/tabs';
import Page from './page';

/**
 * Options page script. This script loads user preferences then handles
 * any changes to those preferences.
 *
 * @module
 * @name OptionsPage
 */
export default class Index extends Page {

    /**
     * @ignore
     */
    constructor() {
        super('appName');

        // translate text elements
        Index.getElement('block-label').innerText = Index.translate('blockedWords');
        Index.getElement('allow-label').innerText = Index.translate('allowedWords');
        Index.getElement('confirm-label').innerText = Index.translate('confirmBlock');
        Index.getElement('mute-label').innerText = Index.translate('muteInstead');
        Index.getElement('help').innerText = Index.translate('help');
        Index.getElement('log-link').innerText = Index.translate('log_link');
        Index.resetButtonText();

        // bind actions
        Index.saveButton.onclick = Index.saveButton.onkeypress = Index.saveSettings;
        Index.getElement('confirm_slider').onkeypress = Index.toggleConfirm;
        Index.getElement('mute_slider').onkeypress = Index.toggleMute;

        // load user settings
        Index.loadSettings();
        Index.loadIntro();
    }

    /**
     * Get save button DOM element
     * @returns {HTMLElement}
     */
    static get saveButton() {
        return Index.getElement('save');
    }

    /**
     * Get block keywords input DOM element
     * @returns {HTMLElement}
     */
    static get blockInput() {
        return Index.getElement('block-words');
    }

    /**
     * Get allow keywords input DOM element
     * @returns {HTMLElement}
     */
    static get allowInput() {
        return Index.getElement('allow-words');
    }

    /**
     * Get "confirm blocks" checkbox DOM element
     * @returns {HTMLElement}
     */
    static get confirmInput() {
        return Index.getElement('confirm');
    }

    /**
     * Get "mute instead of block" checkbox DOM element
     * @returns {HTMLElement}
     */
    static get muteInput() {
        return Index.getElement('mute');
    }
    
    /**
     * Check if user has just installed.
     * @returns {boolean}
     */
    static get isIntro() {
        return new URLSearchParams(window.location.search).get('i') === '';
    }

    /**
     * Reset save button text
     */
    static resetButtonText() {
        Index.saveButton.innerText = Index.translate('saveChanges');
    }

    /**
     * Toggle checkbox on enter click
     * @param e
     */
    static toggleConfirm(e) {
        if (e && e.key === 'Enter') {
            Index.confirmInput.checked = !Index.confirmInput.checked;
        }
    }

    /**
     * Toggle checkbox on enter click
     * @param e
     */
    static toggleMute(e) {
        if (e && e.key === 'Enter') {
            Index.muteInput.checked = !Index.muteInput.checked;
        }
    }
    
    /**
     * Update user preferences
     */
    static saveSettings() {
        Storage.setBlockedWords(Index.blockInput.value, () => {
            Storage.setAllowedWords(Index.allowInput.value, () => {
                Storage.setConfirmationSetting(Index.confirmInput.checked, () => {
                    Storage.setMuteSetting(Index.muteInput.checked, () => {
                        Index.saveButton.innerText = Index.translate('saved');
                        Tabs.notifyTabsOfUpdate();
                        window.setTimeout(Index.resetButtonText, 1000);
                    });
                });
            });
        });
    }

    /**
     * Load user preferences and populate inputs
     */
    static loadSettings() {
        Storage.getSettings(settings => {
            const count = parseInt(settings[Storage.keys.count]);

            // set the inputs
            Index.blockInput.value =
                (settings[Storage.keys.blockWords] || []).join(', ');
            Index.allowInput.value =
                (settings[Storage.keys.allowWords] || []).join(', ');
            Index.confirmInput.checked =
                settings[Storage.keys.confirm];
            Index.muteInput.checked =
                settings[Storage.keys.mute];

            // if enough blocks -> reveal additional content
            if (count > 1 && !Index.isIntro) {
                Index.getElement('block-count').innerText =
                    (Index.translate('blockCount', count.toString()));
            }
        });
    }

    /**
     * Generate an intro message to new user. When showing
     * intro, hide the "other" distractions around the screen.
     */
    static loadIntro() {
        if (Index.isIntro) {
            const container = Index.getElement('intro-container');
            const close = Index.getElement('close-intro');

            Index.getElement('intro-greeting').innerHTML =
                Index.translate('intro_greeting');
            Index.getElement('intro-text').innerHTML =
                Index.translate('intro_text');
            Index.getElement('intro').parentNode.style.display = 'block';
            close.onclick = _ => container.parentNode.removeChild(container);
            close.onkeypress = _ => container.parentNode.removeChild(container);
        }
    }
}
