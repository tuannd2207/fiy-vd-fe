import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: ` <div class="layout-footer">
        Fiy-vd by
        <a href="https://google.com" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Google</a>
    </div>`
})
export class AppFooter {}
