﻿CKEDITOR.dialog.add('scaytDialog', function(f) {
  var g = f.scayt,
      k = '<p><img src="' + g.getLogo() + '" /></p><p>' +
      g.getLocal('version') + g.getVersion() + '</p><p>' +
      g.getLocal('text_copyrights') + '</p>',
      l = CKEDITOR.document, i = {
        isChanged: function() {
          return null === this.newLang || this.currentLang === this.newLang ?
              !1 :
              !0
        },
        currentLang: g.getLang(),
        newLang: null,
        reset: function() {
          this.currentLang = g.getLang();
          this.newLang = null
        },
        id: 'lang'
      },
      k = [
        {
          id: 'options',
          label: g.getLocal('tab_options'),
          onShow: function() {},
          elements: [{
            type: 'vbox',
            id: 'scaytOptions',
            children: function() {
              var a = g.getApplicationConfig(), e = [], c = {
                'ignore-all-caps-words': 'label_allCaps',
                'ignore-domain-names': 'label_ignoreDomainNames',
                'ignore-words-with-mixed-cases': 'label_mixedCase',
                'ignore-words-with-numbers': 'label_mixedWithDigits'
              },
                  d;
              for (d in a) {
                var b = {type: 'checkbox'};
                b.id = d;
                b.label = g.getLocal(c[d]);
                e.push(b)
              }
              return e
            }(),
            onShow: function() {
              this.getChild();
              for (var a = f.scayt, e = 0; e < this.getChild().length; e++)
                this.getChild()[e].setValue(
                    a.getApplicationConfig()[this.getChild()[e].id])
            }
          }]
        },
        {
          id: 'langs',
          label: g.getLocal('tab_languages'),
          elements: [{
            id: 'leftLangColumn',
            type: 'vbox',
            align: 'left',
            widths: ['100'],
            children: [{
              type: 'html',
              id: 'langBox',
              style: 'overflow: hidden; white-space: normal;',
              html:
                  '<div><div style="float:left;width:45%;margin-left:5px;" id="left-col-' +
                  f.name +
                  '"></div><div style="float:left;width:45%;margin-left:15px;" id="right-col-' +
                  f.name + '"></div></div>',
              onShow: function() {
                var a = f.scayt.getLang();
                l.getById('scaytLang_' + a).$.checked = !0
              }
            }]
          }]
        },
        {
          id: 'dictionaries',
          label: g.getLocal('tab_dictionaries'),
          elements: [{
            type: 'vbox',
            id: 'rightCol_col__left',
            children: [
              {type: 'html', id: 'dictionaryNote', html: ''}, {
                type: 'text',
                id: 'dictionaryName',
                label: g.getLocal('label_fieldNameDic') || 'Dictionary name',
                onShow: function(a) {
                  var e = a.sender, c = f.scayt;
                  setTimeout(function() {
                    e.getContentElement('dictionaries', 'dictionaryNote')
                        .getElement()
                        .setText('');
                    null != c.getUserDictionaryName() &&
                        '' != c.getUserDictionaryName() &&
                        e.getContentElement('dictionaries', 'dictionaryName')
                            .setValue(c.getUserDictionaryName())
                  }, 0)
                }
              },
              {
                type: 'hbox',
                id: 'notExistDic',
                align: 'left',
                style: 'width:auto;',
                widths: ['50%', '50%'],
                children: [
                  {
                    type: 'button',
                    id: 'createDic',
                    label: g.getLocal('btn_createDic'),
                    title: g.getLocal('btn_createDic'),
                    onClick: function() {
                      var a = this.getDialog(), e = j, c = f.scayt,
                          d = a.getContentElement(
                                   'dictionaries', 'dictionaryName')
                                  .getValue();
                      c.createUserDictionary(
                          d,
                          function(b) {
                            b.error || e.toggleDictionaryButtons.call(a, !0);
                            b.dialog = a;
                            b.command = 'create';
                            b.name = d;
                            f.fire('scaytUserDictionaryAction', b)
                          },
                          function(b) {
                            b.dialog = a;
                            b.command = 'create';
                            b.name = d;
                            f.fire('scaytUserDictionaryActionError', b)
                          })
                    }
                  },
                  {
                    type: 'button',
                    id: 'restoreDic',
                    label: g.getLocal('btn_restoreDic'),
                    title: g.getLocal('btn_restoreDic'),
                    onClick: function() {
                      var a = this.getDialog(), e = f.scayt, c = j,
                          d = a.getContentElement(
                                   'dictionaries', 'dictionaryName')
                                  .getValue();
                      e.restoreUserDictionary(
                          d,
                          function(b) {
                            b.dialog = a;
                            b.error || c.toggleDictionaryButtons.call(a, !0);
                            b.command = 'restore';
                            b.name = d;
                            f.fire('scaytUserDictionaryAction', b)
                          },
                          function(b) {
                            b.dialog = a;
                            b.command = 'restore';
                            b.name = d;
                            f.fire('scaytUserDictionaryActionError', b)
                          })
                    }
                  }
                ]
              },
              {
                type: 'hbox',
                id: 'existDic',
                align: 'left',
                style: 'width:auto;',
                widths: ['50%', '50%'],
                children: [
                  {
                    type: 'button',
                    id: 'removeDic',
                    label: g.getLocal('btn_deleteDic'),
                    title: g.getLocal('btn_deleteDic'),
                    onClick: function() {
                      var a = this.getDialog(), e = f.scayt, c = j,
                          d = a.getContentElement(
                              'dictionaries', 'dictionaryName'),
                          b = d.getValue();
                      e.removeUserDictionary(
                          b,
                          function(e) {
                            d.setValue('');
                            e.error || c.toggleDictionaryButtons.call(a, !1);
                            e.dialog = a;
                            e.command = 'remove';
                            e.name = b;
                            f.fire('scaytUserDictionaryAction', e)
                          },
                          function(c) {
                            c.dialog = a;
                            c.command = 'remove';
                            c.name = b;
                            f.fire('scaytUserDictionaryActionError', c)
                          })
                    }
                  },
                  {
                    type: 'button',
                    id: 'renameDic',
                    label: g.getLocal('btn_renameDic'),
                    title: g.getLocal('btn_renameDic'),
                    onClick: function() {
                      var a = this.getDialog(), e = f.scayt,
                          c = a.getContentElement(
                                   'dictionaries', 'dictionaryName')
                                  .getValue();
                      e.renameUserDictionary(
                          c,
                          function(d) {
                            d.dialog = a;
                            d.command = 'rename';
                            d.name = c;
                            f.fire('scaytUserDictionaryAction', d)
                          },
                          function(d) {
                            d.dialog = a;
                            d.command = 'rename';
                            d.name = c;
                            f.fire('scaytUserDictionaryActionError', d)
                          })
                    }
                  }
                ]
              },
              {
                type: 'html',
                id: 'dicInfo',
                html:
                    '<div id="dic_info_editor1" style="margin:5px auto; width:95%;white-space:normal;">' +
                    g.getLocal('text_descriptionDic') + '</div>'
              }
            ]
          }]
        },
        {
          id: 'about',
          label: g.getLocal('tab_about'),
          elements: [{
            type: 'html',
            id: 'about',
            style: 'margin: 5px 5px;',
            html: '<div><div id="scayt_about_">' + k + '</div></div>'
          }]
        }
      ];
  f.on('scaytUserDictionaryAction', function(a) {
    var e = SCAYT.prototype.UILib, c = a.data.dialog,
        d = c.getContentElement('dictionaries', 'dictionaryNote').getElement(),
        b = a.editor.scayt, f;
    void 0 === a.data.error ?
        (f = b.getLocal('message_success_' + a.data.command + 'Dic'),
         f = f.replace('%s', a.data.name), d.setText(f),
         e.css(d.$, {color: 'blue'})) :
        ('' === a.data.name ?
             d.setText(b.getLocal('message_info_emptyDic')) :
             (f = b.getLocal('message_error_' + a.data.command + 'Dic'),
              f = f.replace('%s', a.data.name), d.setText(f)),
         e.css(d.$, {color: 'red'}),
         null != b.getUserDictionaryName() && '' != b.getUserDictionaryName() ?
             c.getContentElement('dictionaries', 'dictionaryName')
                 .setValue(b.getUserDictionaryName()) :
             c.getContentElement('dictionaries', 'dictionaryName').setValue(''))
  });
  f.on('scaytUserDictionaryActionError', function(a) {
    var e = SCAYT.prototype.UILib, c = a.data.dialog,
        d = c.getContentElement('dictionaries', 'dictionaryNote').getElement(),
        b = a.editor.scayt, f;
    '' === a.data.name ?
        d.setText(b.getLocal('message_info_emptyDic')) :
        (f = b.getLocal('message_error_' + a.data.command + 'Dic'),
         f = f.replace('%s', a.data.name), d.setText(f));
    e.css(d.$, {color: 'red'});
    null != b.getUserDictionaryName() && '' != b.getUserDictionaryName() ?
        c.getContentElement('dictionaries', 'dictionaryName')
            .setValue(b.getUserDictionaryName()) :
        c.getContentElement('dictionaries', 'dictionaryName').setValue('')
  });
  var j = {
    title: g.getLocal('text_title'),
    resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
    minWidth: 340,
    minHeight: 260,
    onLoad: function() {
      if (0 != f.config.scayt_uiTabs[1]) {
        var a = j, e = a.getLangBoxes.call(this);
        e.getParent().setStyle('white-space', 'normal');
        a.renderLangList(e);
        this.definition.minWidth = this.getSize().width;
        this.resize(this.definition.minWidth, this.definition.minHeight)
      }
    },
    onCancel: function() {
      i.reset()
    },
    onHide: function() {
      f.unlockSelection()
    },
    onShow: function() {
      f.fire('scaytDialogShown', this);
      if (0 != f.config.scayt_uiTabs[2]) {
        var a = f.scayt,
            e = this.getContentElement('dictionaries', 'dictionaryName'),
            c = this.getContentElement('dictionaries', 'existDic')
                    .getElement()
                    .getParent(),
            d = this.getContentElement('dictionaries', 'notExistDic')
                    .getElement()
                    .getParent();
        c.hide();
        d.hide();
        null != a.getUserDictionaryName() && '' != a.getUserDictionaryName() ?
            (this.getContentElement('dictionaries', 'dictionaryName')
                 .setValue(a.getUserDictionaryName()),
             c.show()) :
            (e.setValue(''), d.show())
      }
    },
    onOk: function() {
      var a = j, e = f.scayt;
      this.getContentElement('options', 'scaytOptions');
      a = a.getChangedOption.call(this);
      e.commitOption({changedOptions: a})
    },
    toggleDictionaryButtons: function(a) {
      var e = this.getContentElement('dictionaries', 'existDic')
                  .getElement()
                  .getParent(),
          c = this.getContentElement('dictionaries', 'notExistDic')
                  .getElement()
                  .getParent();
      a ? (e.show(), c.hide()) : (e.hide(), c.show())
    },
    getChangedOption: function() {
      var a = {};
      if (1 == f.config.scayt_uiTabs[0])
        for (var e = this.getContentElement('options', 'scaytOptions')
                         .getChild(),
                 c = 0;
             c < e.length; c++)
          e[c].isChanged() && (a[e[c].id] = e[c].getValue());
      i.isChanged() &&
          (a[i.id] = f.config.scayt_sLang = i.currentLang = i.newLang);
      return a
    },
    buildRadioInputs: function(a, e) {
      var c = new CKEDITOR.dom.element('div');
      CKEDITOR.document.createElement('div');
      var d = 'scaytLang_' + e,
          b = CKEDITOR.dom.element.createFromHtml(
              '<input id="' + d + '" type="radio"  value="' + e +
              '" name="scayt_lang" />'),
          g = new CKEDITOR.dom.element('label'), h = f.scayt;
      c.setStyles({
        'white-space': 'normal',
        position: 'relative',
        'padding-bottom': '2px'
      });
      b.on('click', function(a) {
        i.newLang = a.sender.getValue()
      });
      g.appendText(a);
      g.setAttribute('for', d);
      c.append(b);
      c.append(g);
      e === h.getLang() &&
          (b.setAttribute('checked', !0),
           b.setAttribute('defaultChecked', 'defaultChecked'));
      return c
    },
    renderLangList: function(a) {
      var e = a.find('#left-col-' + f.name).getItem(0),
          a = a.find('#right-col-' + f.name).getItem(0), c = g.getLangList(),
          d = {}, b = [], i = 0, h;
      for (h in c.ltr) d[h] = c.ltr[h];
      for (h in c.rtl) d[h] = c.rtl[h];
      for (h in d) b.push([h, d[h]]);
      b.sort(function(a, c) {
        var b = 0;
        a[1] > c[1] ? b = 1 : a[1] < c[1] && (b = -1);
        return b
      });
      d = {};
      for (c = 0; c < b.length; c++) d[b[c][0]] = b[c][1];
      b = Math.round(b.length / 2);
      for (h in d) i++, this.buildRadioInputs(d[h], h).appendTo(i <= b ? e : a)
    },
    getLangBoxes: function() {
      return this.getContentElement('langs', 'langBox').getElement()
    },
    contents: function(a, e) {
      var c = [], d = e.config.scayt_uiTabs;
      if (d) {
        for (var b in d) 1 == d[b] && c.push(a[b]);
        c.push(a[a.length - 1])
      } else
        return a;
      return c
    }(k, f)
  };
  return j
});