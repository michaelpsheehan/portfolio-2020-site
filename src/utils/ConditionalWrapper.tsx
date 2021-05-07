interface IConditionalWrapper {
    condition: boolean;
    wrapper: any;
    children: any;
}

const ConditionalWrapper = ({condition, wrapper, children }: IConditionalWrapper) => {
    console.log('conditional wrapper props === ', {condition,wrapper, children})
    return (

        condition ? wrapper(children) : children
        )
    }


export default ConditionalWrapper

