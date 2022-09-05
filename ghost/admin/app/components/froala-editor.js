/* eslint-disable */
import FroalaEditorComponent from 'ember-froala-editor/components/froala-editor';
//import FroalaEditorComponent from 'froala-editor';


export default class FroalaEditor extends FroalaEditorComponent {
  options = {
        key: 'xGE6oE3A3B3A10A5C5fLUQZf1ASFb1EFRNh1Hb1BCCQDUHnA8B6E5G5B1C3F3A1B8B6==',
        toolbarInline: false,
        pastePlain: true,
		toolbarSticky:false,
		fontSize:['8','9','10','11','12','13','14','15','16','17','18','19','20','24','30','36','48','60','72','96'],
        toolbarButtons: {
            // Key represents the more button from the toolbar.
            moreText: {
              // List of buttons used in the  group.
              buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],

              // Alignment of the group in the toolbar.
              align: 'left'
            },

            moreParagraph: {
              buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
              align: 'left'
            },

            moreRich: {
              buttons: ['insertLink', 'insertImage', 'callToAction', 'insertFiles', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
              align: 'left'
            },

            moreMisc: {
              buttons: ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
              align: 'right',
              // By default, 3 buttons are shown in the main toolbar. The rest of them are available when using the more button.
              buttonsVisible: 0
            }
        },
        events: {
            'paste.afterCleanup': function (clipboard_html) {
                if (clipboard_html) {
                    clipboard_html =  clipboard_html.replace(/<\s*(\w+).*?>/gi, '<$1>')
                }
                return clipboard_html;
            },
            'image.removed': function ($img) {
                $.ajax({
                    method: 'POST',
                    url: '/blog/ghost/api/admin/delete_image',
                    data: {
                        image: $img.attr('src')
                    }
                })
                .done (function (data) {
                    console.log('Image was deleted');
                })
                .fail (function (err) {
                    console.log('Image delete problem: ' + JSON.stringify(err));
                })
            }
        },
        imageUpload: true,
        imageUploadURL: '/blog/ghost/api/admin/upload_image',
        imageUploadParam: 'image',
        imageUploadRemoteUrls: false,
        iframeStyleFiles: ['/blog/ghost/assets/krabi/style-min.css'],
        requestWithCORS: false,
        iframeStyle: '.fr-view { margin: 0; padding: 0 0 20px 0; }',
        heightMin: 30,
        iframe: true
  };
}