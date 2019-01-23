import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(ofType(AuthActions.TRY_SIGNUP)).pipe(map(
        (action: AuthActions.TrySignup) => {
            return action.payload;
        }
    )).pipe(switchMap(
        (authData: {username: string, password: string}) => {
            return fromPromise(
                firebase.auth()
                .createUserWithEmailAndPassword(
                authData.username, 
                authData.password
            ));
        }
    )).pipe(switchMap(
        () => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        }
    )).pipe(mergeMap(
        (token: string) => {
          return [
            {
                type: AuthActions.SIGNUP
            },
            {
                type: AuthActions.SET_TOKEN,
                payload: token
            }];
        }
    )); 
    
    @Effect()
    authSignin = this.actions$
        .pipe(ofType(AuthActions.TRY_SIGNIN),
        map(
            (action: AuthActions.TrySignin) => {
                return action.payload;
            }
        ),
        switchMap(
            (authData: {username: string, password: string}) => {
                return fromPromise(
                    firebase.auth()
                    .signInWithEmailAndPassword(
                    authData.username, 
                    authData.password
                ));
            } 
        ), 
        switchMap(
            () => {
                return fromPromise(firebase.auth().currentUser.getIdToken());
            }
        ),
        mergeMap(
            (token: string) => {
                return [
                    {type: AuthActions.SIGNIN}, 
                    {type: AuthActions.SET_TOKEN, payload: token}
                ];
            }
        ));

    constructor(private actions$: Actions) {
    }
}