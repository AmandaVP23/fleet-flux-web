import TextInput from '../components/ui/TextInput';

function UITester() {
    return (
        <div className="tester">
            <div className="light">
                <TextInput label="Hello world" />
            </div>
            <div className="dark">
                <TextInput label="Hello world" />
            </div>
        </div>
    );
}

export default UITester;
