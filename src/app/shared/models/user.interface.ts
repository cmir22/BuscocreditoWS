
export interface userRol {
    userRol?: any;
}

export interface adminRol {
    adminRol?: any;
}

export interface childRol {
    childRol?: any;
}

export interface fatherRol {
    fatherRol?: any;
}

export interface UserI {
    id?: any;
    email?: string;
    emailEmpresa?: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
    uid?: string;
    phoneNumber?: string;
    userRol?: userRol;
    adminRol?: adminRol;
    childRol?: childRol;
    fatherRol?: fatherRol



}