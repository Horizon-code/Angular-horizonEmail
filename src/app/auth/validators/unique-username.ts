import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../auth.service'

@Injectable({
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService) { }
    validate = (control2: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors>  => {
        const { value } = control2;
        return this.authService.usernameAvailable(value)
            .pipe(
                map(v => {
                    if (v.available) {
                        console.log(v)
                        return null
                    } else {
                        return value
                    }
                }),
                catchError((e) => {
                    if (e.error.username) {
                        return of({ nonUniqueUsername: true })
                    }
                    else {
                        return of({ somethigWeirdIsGoingOn: true })
                    }
                })
            )

    }
}
