import React, { useEffect, useState } from 'react'
import Notficationcard from './Notficationcard'
import axios from 'axios'
import { useSelector } from "react-redux";
import Loading from '../LoadingComponent/Loading'
import { BASE_URL } from '../../helper'

function Notificationspreview() {

    const userId = useSelector((state) => state.UserInfo.CurrentUserdetails._id);
    const [isLoading, setisloading] = useState(false);
    const [notifications, setnotifications] = useState([]);
    const fetchNotifications = async () => {
        setisloading(true);
        const { data } = await axios.get(`${BASE_URL}/request/notifications/${userId}`)
        if (data.success) {
            setnotifications(data.notifications)
        }
        setisloading(false);
    }
    useEffect(() => {
        if (userId != undefined) {
            fetchNotifications();
        }
    }, [userId])

    const groupNotificationsByDate = (notifications) => {
        const groupedNotifications = {};
        notifications.forEach((notification) => {
            const date = new Date(notification.createdAt).toLocaleDateString();
            if (groupedNotifications[date]) {
                groupedNotifications[date].push(notification);
            } else {
                groupedNotifications[date] = [notification];
            }
        });
        return groupedNotifications;
    };

    const groupedNotifications = groupNotificationsByDate(notifications);



    return (
        <div className='mx-5'>
            <div className=" bg-gray-800 mt-20 mb-52 max-w-2xl m-auto p-8 rounded-xl">
                <div className='text-center'>
                    <span className='text-white text-2xl'>Notifications</span>
                </div>
                <ul role="list" className="max-w-xl m-auto w-[100%]">
                    {
                        isLoading ? (
                            <Loading />
                        ) : (
                            <>
                                {
                                    notifications && notifications.length > 0 ? (
                                        <>
                                            {Object.entries(groupedNotifications).map(([date, notifications]) => (
                                                <div key={date}>
                                                    <div className="bg-gray-600 p-2 text-white rounded mt-4">{date}</div>
                                                    {notifications.map((notification) => (
                                                        <Notficationcard
                                                            person={notification}
                                                            key={notification._id}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <p className='text-red-600 text-center mt-5 font-semibold'>No Notifications in last 10days</p>
                                    )
                                }

                            </>
                        )
                    }
                </ul>
            </div>
        </div>

    )
}

export default Notificationspreview