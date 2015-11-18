import Style from './decorator/Style';

import ComponentDecorator from './decorator/Component';
var Component = new ComponentDecorator().getDecorator();

import TemplateDecorator from './decorator/Template';
var Template = new TemplateDecorator().getDecorator();

import InitialStateDecorator from './decorator/InitialState';
var InitialState = new InitialStateDecorator().getDecorator();

import EventHandlerDecorator from './decorator/EventHandler';
var EventHandler = new EventHandlerDecorator().getDecorator();

export default {
    Component,
    Style,
    Template,
    InitialState,
    EventHandler
}