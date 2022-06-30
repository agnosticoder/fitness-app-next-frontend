import CreateTemplateButton from "./CreateTemplateButton";
import FinishedTemplates from "./FinishedTemplates";
import TemplateInProgress from "./TemplateInProgress";

const Template = () => {
    return (
        <div className="mb-60">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-extrabold">Templates</h1>
                <CreateTemplateButton />
            </div>
            {/* <TemplateInProgress /> */}
            <FinishedTemplates />
        </div>
    );
};

export default Template;