export async function GET(){
    console.log("Cron is running !");

    return Response.json (
        {message : "Cron executed successfully",}
    );
}