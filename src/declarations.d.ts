// Декларация для CSS/SCSS модулей
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

// Декларация для обычных SCSS файлов (импорты без создания объекта classes)
declare module "*.scss" {
  const content: void;
  export default content;
}

// Попутно добавим декларацию для картинок, чтобы потом не было проблем в блоке с фурсоной или галерее
declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.jpeg" {
  const src: string;
  export default src;
}
declare module "*.svg" {
  const src: string;
  export default src;
}
