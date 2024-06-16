import YamlEditor from '@focus-reactive/react-yaml';




interface IProps {
    yaml: any;
    onChange: (values: any) => void;
}
const SparkJobYaml: React.FC<IProps> = ({ yaml, onChange }) => {
    return (
        <YamlEditor
            // value={yaml}
            onChange={onChange}
        />
    );
}

export default SparkJobYaml;