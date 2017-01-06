var dialog = document.querySelector('dialog');
var showDialogButton = document.querySelector('#show-dialog');
if (! dialog.showModal) {
   dialogPolyfill.registerDialog(dialog);
}
if (showDialogButton) {
  showDialogButton.addEventListener('click', function() {
    dialog.showModal();
  });
  dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
  });

}
