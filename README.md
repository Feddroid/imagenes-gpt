# Welcome to imagenes-gpt

## En la terminal

### Inicializamos nuestro servidor:

`npm init -y`

- `-y` completa todos los campos por default, ya que por el momento no se necesita especificar cada uno.

### Instalamos las siguientes librerias:

`npm i express cors dotenv node-fetch`

## En vscode

### En el archivo `package.json`agregamos:

`"type": "module"`

- Necesitamos `node-fetch` para hacer la solicitud `http`, sin embargo la libreria `node-fetch` ya no utiliza `commonjs` (el require). Por esto lo cambiamos a que sea `module` para poder utilizar `require` e `import`

### En el archivo `.env` reemplazar:

`sk-**********************************************"`

## Por la `API keys` de [OpenAI](https://platform.openai.com/account/api-keys) generada al hacer click en el boton:

`+ Create new secrect key`

## En la terminal

### Iniciamos nuestro servidor:

`node index`
