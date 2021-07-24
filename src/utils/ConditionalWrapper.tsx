interface IConditionalWrapper {
    condition: boolean;
    wrapper: any;
    children: any;
}

const ConditionalWrapper = ({condition, wrapper, children }: IConditionalWrapper) =>
    condition ? wrapper(children) : children

export default ConditionalWrapper

