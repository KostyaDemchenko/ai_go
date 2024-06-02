// TuringType.ts
export class TuringType {
  private el: HTMLElement; // Элемент DOM, в который будет вводиться текст
  private text: string; // Текст, который нужно ввести
  private options: { accuracy?: number; interval?: number; callback?: () => void }; // Опции для настройки точности, интервала и коллбэка
  private accuracy: number; // Точность ввода (вероятность правильного символа)
  private int: number; // Интервал времени между вводом символов
  private attr: "value" | "innerText"; // Атрибут элемента, который будет обновляться (value или innerText)
  private i: number; // Текущий индекс вводимого символа
  private len: number; // Длина текста
  private keys: string[]; // Массив возможных ошибочных символов
  private timer?: number; // Таймер для управления интервалами ввода
  private callback?: () => void; // Коллбэк, вызываемый после завершения ввода текста

  constructor(
    el: HTMLElement | string,
    text: string,
    options: { accuracy?: number; interval?: number; callback?: () => void } = {}
  ) {
    // Инициализация переменных
    this.el = typeof el === "string" ? document.querySelector(el)! : el;
    this.text = text;
    this.options = options;
    this.accuracy = options.accuracy ?? 0.95;
    this.int = options.interval ?? 100;
    this.keys = "qwertyuiopasdfghjklzxcvbnm,./;-=[]".split("");
    this.i = 0;
    this.len = this.text.length;
    this.callback = options.callback;

    // Определение атрибута для обновления
    const tag = this.el.tagName.toLowerCase();
    this.attr = tag === "textarea" || tag === "input" ? "value" : "innerText";

    // Запуск процесса ввода текста
    this.type();
  }

  private type() {
    // Если весь текст уже введен, вызвать коллбэк и завершить
    if (this.i === this.len + 1) {
      this.callback?.();
      return;
    }

    // Определение, будет ли текущий символ правильным или ошибочным
    if (Math.random() > this.accuracy) {
      // Ввод ошибочного символа
      this.updatePlaceholder(
        this.text.slice(0, this.i) + this.keys[Math.floor(Math.random() * this.keys.length)]
      );
      this.timer = window.setTimeout(() => {
        // Замена ошибочного символа на правильный
        this.updatePlaceholder(this.text.slice(0, this.i));
        this.timer = window.setTimeout(
          () => this.type(),
          Math.random() * this.int + this.int * 0.8
        );
      }, this.int * 1.5);
    } else {
      // Ввод правильного символа
      this.updatePlaceholder(this.text.slice(0, this.i++));
      // Объявление переменной t перед использованием
      let t = Math.random() * this.int + this.int * 0.1;
      if (this.text[this.i] === " ") t += Math.random() * this.int; // Увеличение паузы после пробела
      if (this.text[this.i] === "." || this.text[this.i] === ",") t += Math.random() * this.int * 3; // Увеличение паузы после знаков препинания
      if (Math.random() > 0.97) t += this.int * 2; // Случайная длительная пауза
      if (Math.random() > 0.95) t += this.int; // Еще одна случайная длительная пауза
      this.timer = window.setTimeout(() => this.type(), t);
    }
  }

  private updatePlaceholder(value: string) {
    // Обновление значения плейсхолдера
    if (this.el instanceof HTMLInputElement || this.el instanceof HTMLTextAreaElement) {
      this.el.placeholder = value;
    }
  }

  pause() {
    // Остановка текущего таймера
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  clear(n = this.len) {
    // Очистка текста по одному символу за раз
    if (n === -2) return;
    this.updatePlaceholder(this.text.slice(0, this.i--));
    window.setTimeout(() => this.clear(--n), Math.random() * this.int);
  }
}
