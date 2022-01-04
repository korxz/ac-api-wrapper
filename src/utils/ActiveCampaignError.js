class ActiveCampaignError extends Error 
{
    constructor(message)
    {
        super(message);
        this.name = 'ActiveCampaignError';
    }
}