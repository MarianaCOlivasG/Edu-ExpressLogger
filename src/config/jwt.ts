
import jwt from 'jsonwebtoken';
import { envs } from './envs';

export class JwtAdapter {


    static async generateToken( payload: Object, duration: number = 24 * 60 * 60  ): Promise<string | null > {

        return new Promise( (resolve) => {

            jwt.sign( payload, envs.JWT_SEED, { expiresIn: duration }, ( err, accessToken ) => {

                if ( err ) {
                    return resolve(null);
                }

                resolve(accessToken!);

            })

        });

    }



    static validateToken<T>( accessToken: string ): Promise<T | null> {

        return new Promise( (resolve) => {

            jwt.verify(accessToken, envs.JWT_SEED, (err, decoded) => {

                if ( err ) {
                    console.log({err});
                    return resolve(null);
                }
                resolve(decoded as T);
            })

        });

    }

}