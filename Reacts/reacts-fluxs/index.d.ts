import { StoreType } from '../../Fluxs/types/store';

export type MapStateToProps = (
    store: StoreType,
    props: { [key: string]: any },
) => { [key: string]: any };
// export type MapDispatchToProps = (dispatch: Dispatch, props: Object) => Object;
