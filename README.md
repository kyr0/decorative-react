decorative-react.js
===================

...is an ES7 micro-framework promoting @decorator pattern-driven app development using react.

Using decorators means to write:
- less lines
- less complex
- better maintainable 
- better readable
- more loosely coupled
code.

It's really "decorative" code you will write using ```@decorators``` ;)

Decorators were introduced to Babel.js in spring 2015 by Yehuda Katz. Since then, only 
a few decorators were implemented (see core-decorators). But the world didn't care much, 
no matter if they are amazing or not.

When I discovered the es7.decorators I realized the power they could bring
to my web apps and I began to implement decorative.js.

decorative.js is currently under development but already used to develop
a web app which I will release soon. I rely on this framework and it's toolchain (Babel.js)
and it works stable for my use-cases. I can't guarantee that it fully works for you but I think
it's worth a try or at least a quick look.

decorative-react.js adds some more decorators, specifically for react development on top 
of the set of decorators provided by decorative.js.

    https://github.com/kyr0/decorative-react

Reading the docs of decorative.js before starting to use decorative-react definitely 
saves you some headaches :)

## React decorators 

The decorators described in this section can be understood as additions to the set of
decorators already available through decorative.js. Both micro-frameworks in combination
can be used as building blocks of a modern web application. 

Just install this package like this:

    npm install decorative-react --save
 
for your convenience it brings you the whole ```decorative``` lib as a dependency.    
    
### @Component()

Transforms the decorated class into a React.Component. Therefore it extends from that base class and
applies the code required to let a genuine ES6 class act nicely as a React component.
 
  
      import { Component } from 'decorative-react';
      
      @Component()
      class MyButton {
          
      }
      
Limitation: The ```@Component()``` decoration should always be the first on a class (see ```@InitialState```)

### @Style(JSS:Object)

Assigns a JSS stylesheet object to a Component. The reference to this object is then available 
in the JSX template via an additional argument (see ```@Template```).

      import { Component, Style } from 'decorative-react';
      import JSS from './MyButton.jss';
      
      @Style(JSS)
      @Component()
      class MyButton {
          
      }
      
A JSS stylesheet file like ```MyButton.jss``` is a plain, exported JavaScript object:
    
    export default {
    
        myButton: {
            'margin': '50px',
            'box-shadow': '0px 0px 50px rgba(0,0,0, 0.5)',
            'border-radius': '5px 5px 5px 5px'
        }
    };
    
For more information regarding JSS take a look at the JSS repo:

    https://github.com/TODO

### @Template(JSX:Function)

Injects a JSX template into the Component and mixes a default ```render()``` method into the class prototype.

    import { Component, Style } from 'decorative-react';
    import JSS from './MyButton.jss';
    import JSX from './MyButton.jsx';
      
    @Template(JSX)  
    @Style(JSS)
    @Component()
    class MyButton {
          
    }
    
A JSX file like ```MyButton.jsx``` then could be implemented externally like this:

    import React from 'react';
    export default function(state:Object, classes:Object, i18n:Object) {
    
        return <button disabled={state.isButtonDisabled} className=classes.myButton>{i18n['loginButtonLabel']} {this.props.fooBar}</button>
    }
  
Well, this is a template which is already using all the features of all decorators: state, JSS classes and the 
translation object. A lot of boilerplate code is unnecessary now. There is no syntax error in this example: 
You can directly return JSX without any function call wrapping!

Limitation: If the arguments are available depends on which decorators you've applied to the Component class.

### @InitialState(state:Object)

Injects the initial state into a Component. This way you won't have to write a method for it.

    import { Component, Style } from 'decorative-react';
    import JSS from './MyButton.jss';
    import JSX from './MyButton.jsx';
      
    @Template(JSX)  
    @Style(JSS)
    @InitialState({
        isButtonDisabled: true
    })
    @Component()
    class MyButton {
          
    }
    
Well, as you can see we now come to a sophisticated button class without writing a single line of boilerplate code!

### @EventHandler()

Wraps event handler methods of a component and calls them auto-binded to the components scope and with the 
event.target as the first argument. Btw. it makes clear which methods are interacting directly with JSX.

    import { Component, Style } from 'decorative-react';
    import JSS from './MyButton.jss';
    import JSX from './MyButton.jsx';
      
    @Template(JSX)  
    @Style(JSS)
    @InitialState({
        isButtonDisabled: false
    })
    @Component()
    class MyButton {
          
        @EventHandler()
        onClick(buttonEl, syntheticEvent) {
          
            this.setState({
                isButtonDisabled: true
            });
        }
    }

## Roadmap

Although a lot has been implemented, there is still a lot to do and you are very welcome to push :)

Features planned to be introduced in the near future:

  - Please create an issue regarding your own feature requests