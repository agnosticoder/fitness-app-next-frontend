import FinishedTemplates from "./FinishedTemplates";
import TemplateInProgress from "./TemplateInProgress";

const Template = () => {

    return (
        <div>
            <TemplateInProgress />
            <FinishedTemplates />
        </div>
    );
};

export default Template;