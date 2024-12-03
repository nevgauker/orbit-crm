import TeamCreationForm from "@/components/forms/team_form";

const CreateTeamPage = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Teams</h1>
            <TeamCreationForm />
        </div>
    );
}

export default CreateTeamPage