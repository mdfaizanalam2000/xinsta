import React, { useEffect, useState } from 'react'

const Header = (props) => {
    const [file, setFile] = useState();
    const [fileUploaded, setFileUploaded] = useState(false);
    const [action, setAction] = useState("unfollowers");
    let [following_arr, setFollowingArr] = useState([]);
    let [followers_arr, setFollowersArr] = useState([]);
    const [refreshEffect, setRefreshEffect] = useState(false);

    useEffect(() => {
        followers_arr = followers_arr.map(item => item.string_list_data[0].value);
        following_arr = following_arr.map(item => item.string_list_data[0].value);
        console.log(followers_arr);
        console.log(following_arr);

        const unfollowers = following_arr.filter((item) => {
            return !followers_arr.includes(item)
        })
        console.log(unfollowers);
    }, [refreshEffect])

    const handleUploadFile = (e) => {
        const file = e.target.files;
        setFile(file);
        setFileUploaded(true);
    }

    const handleScan = async () => {
        if (!file[0].name.endsWith(".json") && !file[1]?.name.endsWith(".json")) {
            alert("JSON file desired!");
            return;
        }

        console.log(action);
        if (action === "pending_requests") {
            handleScanPendingRequests();
        }
        if (action === "unfollowers") {
            handleScanUnfollowers();
        }
    }

    const handleScanPendingRequests = () => {
        try {
            const reader = new FileReader();
            reader.readAsText(file[0]);
            reader.onload = () => {
                JSON.parse(reader.result).relationships_follow_requests_sent !== undefined && props.setData(JSON.parse(reader.result).relationships_follow_requests_sent);
            }
        } catch (e) {
            alert("Error occured!");
        }
    }

    const handleScanUnfollowers = () => {
        const r1 = new FileReader();
        const r2 = new FileReader();
        r1.readAsText(file[0]);
        r2.readAsText(file[1]);
        r1.onload = () => {
            r2.onload = () => {
                setFollowingArr(JSON.parse(r1.result).relationships_following !== undefined ? JSON.parse(r1.result).relationships_following : JSON.parse(r2.result).relationships_following);
                setFollowersArr(JSON.parse(r2.result).relationships_following === undefined ? JSON.parse(r2.result) : JSON.parse(r1.result));
                refreshEffect ? setRefreshEffect(false) : setRefreshEffect(true);
            }
        }
    }

    return (
        <div>
            <h4 className='text-center'>Welcome to simple and secure instagram tool!</h4>
            <p>Privacy is our topmost priority.</p>
            <p>No backend server is involved.</p>
            <p>Your file is never saved, It vanishes when you leave.</p>
            <p>We cannot read file data once you leave application.</p>
            <hr />
            <input multiple type="file" accept='.json' onChange={handleUploadFile} /><br />
            <select name="actions" id="actions" onChange={(e) => setAction(e.target.value)}>
                <option value="unfollowers">Find unfollowers</option>
                <option value="pending_requests">Find pending requests</option>
            </select>
            <button className={fileUploaded ? "btn btn-primary my-3 ms-2" : "btn btn-primary my-3 ms-2 disabled"} type="submit" onClick={handleScan}>Scan now</button>
        </div>
    )
}

export default Header
