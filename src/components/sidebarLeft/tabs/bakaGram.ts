/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import Row from '../../row';
import CheckboxField from '../../checkboxField';
import {SliderSuperTabEventable} from '../../sliderTab';
import {LangPackKey} from '../../../lib/langPack';
import SettingSection from '../../settingSection';

export default class AppBakaGramTab extends SliderSuperTabEventable {
  public init() {
    this.container.classList.add('bakagram-container');
    this.setTitle('bakaGram.SettingsTitle');

    const BakaGramSection = (options: {
      name: LangPackKey,
      caption?: LangPackKey,
      settings: {
        name: LangPackKey,
        type: 'boolean',
        typeText?: LangPackKey,
        value: boolean,
        onChange: (value: boolean) => void
      }[]
    }) => {
      const section = new SettingSection({
        name: options.name,
        caption: options.caption
      });

      options.settings.forEach((setting) => {
        const enabledRow = new Row({
          checkboxField: new CheckboxField({text: setting.name, checked: setting.value}),
          subtitleLangKey: 'Loading',
          listenerSetter: this.listenerSetter,
          withCheckboxSubtitle: true
        });
        section.content.append(enabledRow.container);

        const applySettings = async() => {
          const enabled = setting.value;
          enabledRow.checkboxField.checked = enabled;

          return enabled;
        };

        applySettings();

        enabledRow.checkboxField.input.addEventListener('change', (e) => {
          setting.onChange((e.target as HTMLInputElement).checked);
        });
      });
      this.scrollable.append(section.container);
    };

    BakaGramSection({
      name: 'bakaGram.AppearanceTitle',
      caption: 'bakaGram.AppearanceCaption',
      settings: [{
        name: 'bakaGram.showTightChatList',
        type: 'boolean',
        value: localStorage.getItem('bakagram_doNotShowTightChatlist') !== 'true',
        onChange: (value: boolean) => {
          localStorage.setItem('bakagram_doNotShowTightChatlist', (!value).toString());
        }
      }, {
        name: 'bakaGram.disableAutoCloseContextMenu',
        type: 'boolean',
        value: localStorage.getItem('bakagram_autoCloseContextMenu') !== 'true',
        onChange: (value: boolean) => {
          localStorage.setItem('bakagram_autoCloseContextMenu', (!value).toString());
        }
      }, {
        name: 'bakaGram.hideNewMenu',
        type: 'boolean',
        value: localStorage.getItem('bakagram_dontHideNewMenu') !== 'true',
        onChange: (value: boolean) => {
          localStorage.setItem('bakagram_dontHideNewMenu', (!value).toString());
        }
      }]
    });

    BakaGramSection({
      name: 'bakaGram.aboutTitle',
      caption: 'bakaGram.aboutCaption',
      settings:[]
    });
  }
}
