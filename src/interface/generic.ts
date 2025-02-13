export type FlagsRequired<MyObject, Type> = {
    [Property in keyof MyObject]: Type;
};

export type FlagsOptionals<MyObject, Type> = {
    [Property in keyof MyObject]?: Type;
};