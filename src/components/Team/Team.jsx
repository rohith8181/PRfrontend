import React from 'react'
const Rohith = require("../../assests/Rohith.JPG")
const Gowtham = require("../../assests/Gowtham.jpg")
const Balaji = require("../../assests/Balaji.jpg")
const Jashwanthjee = require("../../assests/Jashwanthjee.jpg")
const Dilipkumar = require("../../assests/Dilipkumar.jpeg")

function Team() {
    return (
        <section className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-4 py-12">
            <div className="text-center pb-12">
                <h2 className="font-bold text-xl md:text-2xl lg:text-3xl font-heading text-gray-900">
                    Check our awesome team members
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
                    <div className="mb-8">
                        <img className="object-center object-cover rounded-full h-36 w-36" src={Rohith} />
                    </div>
                    <div className="text-center">
                        <p className="text-xl text-gray-700 font-bold mb-2">Rohith</p>
                        <p className="text-base text-gray-400 font-normal">Developer</p>
                    </div>
                </div>
                <div className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
                    <div className="mb-8">
                        <img className="object-center object-cover rounded-full h-36 w-36" src={Jashwanthjee} />
                    </div>
                    <div className="text-center">
                        <p className="text-xl text-gray-700 font-bold mb-2">Jashwanth jee</p>
                        <p className="text-base text-gray-400 font-normal">Developer</p>
                    </div>
                </div>
                <div className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
                    <div className="mb-8">
                        <img className="object-center object-cover rounded-full h-36 w-36" src={Dilipkumar} />
                    </div>
                    <div className="text-center">
                        <p className="text-xl text-gray-700 font-bold mb-2">Dilip Kumar</p>
                        <p className="text-base text-gray-400 font-normal">Product Manager</p>
                    </div>
                </div>
                <div className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
                    <div className="mb-8">
                        <img className="object-center object-cover rounded-full h-36 w-36" src={Balaji} />
                    </div>
                    <div className="text-center">
                        <p className="text-xl text-gray-700 font-bold mb-2">Balaji</p>
                        <p className="text-base text-gray-400 font-normal">UI Design</p>
                    </div>
                </div>
                <div className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
                    <div className="mb-8">
                        <img className="object-center object-cover rounded-full h-36 w-36" src={Gowtham} />
                    </div>
                    <div className="text-center">
                        <p className="text-xl text-gray-700 font-bold mb-2">Goutham</p>
                        <p className="text-base text-gray-400 font-normal">Database</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Team