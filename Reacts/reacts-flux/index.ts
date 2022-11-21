export type MapStateToProps<S = any> = (
    store: S,
    props: { [key: string]: any },
) => { [key: string]: any };
// export type MapDispatchToProps = (dispatch: Dispatch, props: Object) => Object;
