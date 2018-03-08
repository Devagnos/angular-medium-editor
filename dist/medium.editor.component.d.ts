import { ElementRef, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
/**
 * Usage :
 * <medium-editor ngModel name="content" class="editable" #content="ngModel" [config]="getConfig()"></medium-editor>
 */
export declare class MediumEditorComponent {
    config: any;
    configFile: any;
    change: EventEmitter<{}>;
    host: any;
    editor: any;
    value: string;
    instance: any;
    ngControl: any;
    elementRef: any;
    constructor(elementRef: ElementRef, ngControl: NgControl);
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    editorInit(config: any): void;
    hackUpdate(): void;
    writeValue(value: any): void;
    onChange(_: any): void;
    onTouched(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
