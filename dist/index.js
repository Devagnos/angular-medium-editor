import { Component, ElementRef, EventEmitter, Input, NgModule, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgControl } from '@angular/forms';
import * as MediumEditor from 'medium-editor';
import { jQuery } from 'jquery';

// Imports
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * Usage :
 * <medium-editor ngModel name="content" class="editable" #content="ngModel" [config]="getConfig()"></medium-editor>
 */
var MediumEditorComponent = (function () {
    /**
     * @param {?} elementRef
     * @param {?} ngControl
     */
    function MediumEditorComponent(elementRef, ngControl) {
        this.change = new EventEmitter();
        this.editor = null;
        this.value = '';
        this.instance = null;
        if (ngControl) {
            ngControl.valueAccessor = this;
            this.ngControl = ngControl;
        }
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    MediumEditorComponent.prototype.ngOnDestroy = function () {
        if (this.editor) {
            this.editor.destroy();
            this.editor = null;
        }
    };
    /**
     * @return {?}
     */
    MediumEditorComponent.prototype.ngAfterViewInit = function () {
        var /** @type {?} */ config = {};
        config = this.config || {};
        this.editorInit(config);
    };
    
    /**
     * @param {?} config
     * @return {?}
     */
    MediumEditorComponent.prototype.editorInit = function (config) {
        var _this = this;
        this.editor = new MediumEditor(this.host.nativeElement, config);
        // check for insert plugin
        if (config.insertPlugin) {
            jQuery(this.host.nativeElement).mediumInsert(__assign({}, config.insertPlugin, { editor: this.editor }));
        }
        // Change event
        var /** @type {?} */ editable = this.editor.elements[0];
        this.editor.subscribe('editableInput', function (event, editable) {
            var /** @type {?} */ value = _this.editor.elements[0].innerHTML;
            // This doesn't work ???
            _this.onChange(value);
            _this.change.emit(value);
            _this.ngControl.viewToModelUpdate(value);
        });
    };
    /**
     * @return {?}
     */
    MediumEditorComponent.prototype.hackUpdate = function () {
        if (this.editor) {
            var /** @type {?} */ value = this.value;
            this.ngControl.viewToModelUpdate(value);
            this.change.emit(value);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MediumEditorComponent.prototype.writeValue = function (value) {
        this.value = value;
        if (this.editor) {
            if (value && value !== '') {
                this.editor.elements[0].nextSibling.value = value;
                this.editor.elements[0].innerHTML = (value);
                this.editor.elements[0].setAttribute('data-placeholder', '');
            }
            else {
                this.editor.elements[0].nextSibling.value = null;
                this.editor.elements[0].innerHTML = '';
                this.editor.elements[0].setAttribute('data-placeholder', '');
            }
        }
    };
    /**
     * @param {?} _
     * @return {?}
     */
    MediumEditorComponent.prototype.onChange = function (_) { };
    
    /**
     * @return {?}
     */
    MediumEditorComponent.prototype.onTouched = function () { };
    
    /**
     * @param {?} fn
     * @return {?}
     */
    MediumEditorComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    
    /**
     * @param {?} fn
     * @return {?}
     */
    MediumEditorComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    
    return MediumEditorComponent;
}());
MediumEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'medium-editor',
                template: "<textarea #host></textarea>"
            },] },
];
/**
 * @nocollapse
 */
MediumEditorComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: NgControl, },
]; };
MediumEditorComponent.propDecorators = {
    'config': [{ type: Input },],
    'configFile': [{ type: Input },],
    'change': [{ type: Output },],
    'host': [{ type: ViewChild, args: ['host',] },],
};

var MediumEditorModule = (function () {
    function MediumEditorModule() {
    }
    /**
     * @return {?}
     */
    MediumEditorModule.forRoot = function () {
        return {
            ngModule: MediumEditorModule
        };
    };
    return MediumEditorModule;
}());
MediumEditorModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    MediumEditorComponent
                ],
                exports: [
                    MediumEditorComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
MediumEditorModule.ctorParameters = function () { return []; };

export { MediumEditorModule, MediumEditorComponent };
