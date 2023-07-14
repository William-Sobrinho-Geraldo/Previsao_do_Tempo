import { TextInput } from "react-native";

const TextInputCustom = ({ placeHolder = "Inserir hint", onChangeText , value }) => {
    return (
        <TextInput
            placeholder={placeHolder}
            onChangedText={onChangeText}
            value={value}
            
        />
    );
};

export default TextInputCustom;