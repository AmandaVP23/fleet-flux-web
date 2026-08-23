import TextInput from '../components/ui/TextInput';

function UITester() {
    return (
        <div className="tester">
            <div className="light">
                <TextInput
                    value=""
                    label="Hello world"
                    helperText="hello world, this is incredible"
                    error={{
                        typeOfViolation: 'NotBlank',
                    }}
                />
            </div>
            <div className="dark">
                <TextInput
                    value=""
                    label="Hello world"
                    helperText="hello world, this is incredible"
                    error={{
                        typeOfViolation: 'NotBlank',
                    }}
                />
            </div>
        </div>
    );
}

export default UITester;
