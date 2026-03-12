import { useEffect, useState } from "react";

export default function SearchComponent(){
    const [searchquery, setsearchquery] = useState<String>("");
    const [output, setoutput] = useState<String[]>([]);
    useEffect(() => {
        const getData = async () =>{
            const searchurl = "http://localhost:8081/v1/search/" + searchquery;
            const data = await fetch(searchurl);
            const data_parsed = await data.json();
           setoutput(data_parsed.query_output.total);
            const temp: string[] =  [];
            for(let i = 0; i <= data_parsed.query_output.total; i++){
               
                const temp_name = await  data_parsed.query_output.documents[i].value.name;
                temp.push(temp_name);
            }
            setoutput(temp);
        }
        console.log(output);

        getData();
    }, [searchquery])
    return(
        <>
        <form>
            <input onChange={(e) => setsearchquery(e.target.value)} placeholder="Wohnzimmer, Bühne..."/>
        </form>

        </>


    );


}