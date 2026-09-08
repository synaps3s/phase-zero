/*
 * The site's own dialog.
 *
 * A browser's built-in confirm box is a different piece of software wearing
 * its own colours, sized by the browser, saying the site's domain name at the
 * top. It also blocks the whole page while it is open. For a site whose whole
 * argument is that it looks like itself, borrowing that box is the one place
 * the design gives up.
 *
 * This is a real <dialog>, so the browser still does the parts that are hard
 * to do well by hand: it traps focus, it closes on Escape, it puts itself in
 * the top layer above everything, and it returns focus where it came from.
 * The only thing added here is the site's own material.
 *
 * Every caller passes its own text, because no string in this project is
 * written in code.
 */

interface Ask {
  title: string;
  /** A sentence, or an element to show instead of one, such as a preview. */
  body: string | HTMLElement;
  confirm: string;
  cancel: string;
  /** Marks the confirming action as the one that cannot be undone. */
  destructive?: boolean;
}

/**
 * Asks, and resolves true when the reader confirms.
 *
 * Falls back to the browser's own box where <dialog> is not supported, which
 * is worse looking and still correct. A question that cannot be asked must
 * never be treated as answered.
 */
export function ask(options: Ask): Promise<boolean> {
  if (typeof HTMLDialogElement === 'undefined') {
    const text = typeof options.body === 'string' ? options.body : options.title;
    return Promise.resolve(window.confirm(text));
  }

  const dialog = document.createElement('dialog');
  dialog.className = 'dialog';
  if (options.destructive) dialog.dataset.destructive = 'true';

  const heading = document.createElement('h2');
  heading.className = 'dialog-title';
  heading.textContent = options.title;
  dialog.append(heading);

  if (typeof options.body === 'string') {
    const paragraph = document.createElement('p');
    paragraph.className = 'dialog-body';
    paragraph.textContent = options.body;
    dialog.append(paragraph);
  } else {
    const holder = document.createElement('div');
    holder.className = 'dialog-figure';
    holder.append(options.body);
    dialog.append(holder);
  }

  const actions = document.createElement('div');
  actions.className = 'dialog-actions';

  const cancel = document.createElement('button');
  cancel.type = 'button';
  cancel.className = 'dialog-button';
  cancel.textContent = options.cancel;

  const confirm = document.createElement('button');
  confirm.type = 'button';
  confirm.className = 'dialog-button dialog-confirm';
  confirm.textContent = options.confirm;

  actions.append(cancel, confirm);
  dialog.append(actions);
  document.body.append(dialog);

  return new Promise<boolean>((resolve) => {
    let answer = false;

    const close = (value: boolean) => {
      answer = value;
      dialog.close();
    };

    cancel.addEventListener('click', () => close(false));
    confirm.addEventListener('click', () => close(true));
    /* Escape and the backdrop both mean no. The browser fires close for the
       first of those on its own, so answer is already false when it does. */
    dialog.addEventListener('cancel', () => {
      answer = false;
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) close(false);
    });
    dialog.addEventListener('close', () => {
      dialog.remove();
      resolve(answer);
    });

    dialog.showModal();
    // The safe choice is the one under the finger when the dialog opens.
    cancel.focus();
  });
}
