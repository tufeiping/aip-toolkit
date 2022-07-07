## A8前端工程创建脚手架 (AIP-ToolKit)

A8 产品前端环境脚手架，通过命令可以快速构建A8前端工程。

A8的项目在核心依赖上有其特定要求，为了不让研发人员自己去定义项目的核心依赖，造成版本冲突及浪费不必要的调试时间，A8提供了一个脚手架，可以让研发人员在规定版本范围快速进入开发阶段。


## HOW TO USE

### Project

1. install the package `npm install -g aip-toolkit`
2. create a8 project `npx aip-toolkit create <project-name> -c <context-path>`
3. cd project-name directory and run `npm i && npm start`


~~~sh
npx aip-toolkit create helloworld -c "hello"
~~~

### Module

1. install the package `npm install -g aip-toolkit`
2. create a8 project `npx aip-toolkit module <module-name>`
3. cd project-name directory and run `./buildandpublish.sh`

~~~sh
npx aip-toolkit module helloworld
~~~

### Rich Client Project

1. install the package `npm install -g aip-toolkit`
2. create a8 project `npx aip-toolkit rich <project-name>`
3. cd project-name directory and run `./buildandpublish.sh`

~~~sh
npx aip-toolkit rich helloworld
~~~
