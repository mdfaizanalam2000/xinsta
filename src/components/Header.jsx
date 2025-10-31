import React, { useState } from 'react'
import JSZip from 'jszip';

const Header = (props) => {
    const [file, setFile] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [action, setAction] = useState("unfollowers");

    const handleUploadFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setFileUploaded(true);
    }

    const handleScan = async () => {
        if (!file.name.endsWith(".zip")) {
            alert("Zip file desired!");
            return;
        }

        const zip = new JSZip();
        const contents = await zip.loadAsync(file);

        let read = contents.file("connections/followers_and_following/followers_1.json");
        const followers = read === null ? [] : JSON.parse(await read.async('text'));
        read = contents.file("connections/followers_and_following/following.json");
        const followings = read === null ? [] : JSON.parse(await read.async('text')).relationships_following;
        read = contents.file("connections/followers_and_following/recent_follow_requests.json");
        const pending_follow_requests = read === null ? [] : JSON.parse(await read.async('text')).relationships_permanent_follow_requests;

        if (action === "unfollowers") {
            props.setCardMessage("You followed them on: ");
            handleScanUnfollowers(followers, followings);
        }
        if (action === "ghost_followers") {
            props.setCardMessage("They followed you on: ");
            handleScanGhostFollowers(followers, followings);
        }
        if (action === "pending_requests") {
            props.setCardMessage("You sent follow request on: ");
            handleScanPendingRequests(pending_follow_requests);
        }
    }

    const handleScanPendingRequests = (pending_follow_requests) => {
        if (pending_follow_requests.length === 0) {
            props.setMessage("No recent follow request found!");
            props.setData([]);
            return;
        }
        props.setMessage(`Found ${pending_follow_requests.length} recently sent follow request(s).`);
        props.setData(pending_follow_requests);
    }

    const handleScanUnfollowers = (followers, followings) => {
        const followers_ids = followers.map((follower) => {
            return follower.string_list_data[0].value
        })
        const followings_ids = followings.map((following) => {
            return following.title
        })

        const unfollowers = followings_ids.filter((user) => {
            return !followers_ids.includes(user);
        })

        if (unfollowers.length === 0) {
            props.setMessage("No unfollower found!");
            props.setData([]);
            return;
        }

        let unfollowers_data = [];
        for (const index in unfollowers) {
            const user = followings.filter((user) => {
                return unfollowers[index] === user.title;
            })
            unfollowers_data.push(user[0]);
        }

        props.setMessage(`Found ${unfollowers.length} unfollower(s). This also includes deactivated accounts(if any)`);
        props.setData(unfollowers_data);
    }

    const handleScanGhostFollowers = (followers, followings) => {
        const followers_ids = followers.map((follower) => {
            return follower.string_list_data[0].value
        })
        const followings_ids = followings.map((following) => {
            return following.title
        })

        const ghost_followers = followers_ids.filter((user) => {
            return !followings_ids.includes(user);
        })

        if (ghost_followers.length === 0) {
            props.setMessage("You follow back everyone!");
            props.setData([]);
            return;
        }

        let ghost_followers_data = [];
        for (const index in ghost_followers) {
            const user = followers.filter((user) => {
                return ghost_followers[index] === user.string_list_data[0].value;
            })
            ghost_followers_data.push(user[0]);
        }

        props.setMessage(`Found ${ghost_followers.length} follower(s) you don't follow back.`);
        props.setData(ghost_followers_data);
    }

    return (
        <>
            <h5 className='text-center my-3'>Welcome to simple and secure instagram tool</h5>
            <p>👉 Privacy is our topmost priority.</p>
            <p>👉 No backend server is involved, so your data is extremely safe.</p>
            <p>👉 Your files are never saved, It vanishes when you leave.</p>
            <p>👉 We cannot access your files once you leave the application.</p>
            <p>👉 Go forward and check analytics that are not supported by instagram.</p>
            <hr />
            <h5 className='text-center my-2'>How to get zip file?</h5>
            <p>Step 1: Open instagram app and go to your profile -&gt; Settings</p>
            <p>Step 2: Go to "Your activity" -&gt; "Download Your Information"</p>
            <p>Step 3: Go to "Download or transfer information" -&gt; "Some of your information"</p>
            <p>Step 4: Select "Followers and following" under "Connections" -&gt; "Next"</p>
            <p>Step 5: Select "Download to device" -&gt; "Next"</p>
            <p>Step 6: Set "Date range" to "All time" and "Format" to "JSON"</p>
            <p>Step 7: Keep others as default and click "Create files"</p>
            <p>Step 8: Your files will be ready to download in 2-3 minutes. Verify your password to download and then upload that file here.</p>
            <hr />
            <input type="file" accept='.zip' onChange={handleUploadFile} />
            <br />
            <select name="actions" id="actions" onChange={(e) => setAction(e.target.value)}>
                <option value="unfollowers">Find unfollowers</option>
                <option value="ghost_followers">Find followers you don't follow back</option>
                <option value="pending_requests">Find recently sent follow requests</option>
            </select>
            <button className={fileUploaded ? "btn btn-success my-3 ms-2" : "btn btn-secondary my-3 ms-2 disabled"} type="submit" onClick={handleScan}>Scan now</button>
        </>
    )
}

export default Header
