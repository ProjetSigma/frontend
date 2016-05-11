import {Component, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'search-box',
    template: `<input #input type="text" (input)="update.emit(input.value)" class="champ">`
})
export class SearchBox {
    @Output() update = new EventEmitter();

    ngOnInit() {
        this.update.emit('');
    }
}
