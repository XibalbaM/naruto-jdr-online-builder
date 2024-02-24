import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChakraSpesComponent} from './chakra-spes.component';

describe('GetChrakraSpeComponent', () => {
    let component: ChakraSpesComponent;
    let fixture: ComponentFixture<ChakraSpesComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ChakraSpesComponent]
        });
        fixture = TestBed.createComponent(ChakraSpesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
