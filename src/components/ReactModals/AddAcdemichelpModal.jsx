import React, { useState, useRef, useEffect, useMemo } from 'react'
import ReactQuill from 'react-quill'
import axios from 'axios';
import Modal from "react-modal";
import { ToastContainer, toast } from 'react-toastify';
import { GrClose } from 'react-icons/gr';
import { useSelector } from "react-redux";
import TQModal from './TQModal';
import { BASE_URL } from '../../helper'


function AddAcdemichelpModal({ isOpen, closeModal }) {
    const [text, setText] = useState('');
    const [posted, setPosted] = useState(false);
    const quillRef = useRef(null);
    const [AllImages, setAllImages] = useState([]);
    const [removedImages, setremovedimages] = useState([]);


    useEffect(() => {
        setText('');
        setDesc('');
        setIsloading(false);
        setTitle('');
        setPosted(false);
        setAllImages([]);
        setremovedimages([])
    }, [isOpen])

    const handleQuillImageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = () => {
            const file = input.files[0];
            if (file) {
                handleImageUpload(file);
            }
        };
        input.click();
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`${BASE_URL}/request/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = response.data.imageUrl;
            insertImage(imageUrl);
        } catch (error) {
            console.log(error);
        }
    };


    const insertImage = (url) => {
        const fullurl = `${BASE_URL}/${url}`
        const editor = quillRef.current?.getEditor();
        if (!editor) {
            console.error('Quill editor instance not available');
            return;
        }

        const range = editor.getSelection(true);
        // console.log(range);
        let adjustedIndex = range ? range.index : 0;
        if (range.index === 0) {
            // If the range index is zero, insert a placeholder character before the image
            editor.insertText(0, ' ');
            adjustedIndex = 1;
        }

        editor.insertEmbed(adjustedIndex, 'image', fullurl, 'user');
        editor.setSelection(adjustedIndex + 1);

        // console.log('Image inserted successfully:', url);
    };


    const handleQuillTextChange = (content, delta, source, editor) => {
        const currentImages = extractImageUrls(editor.getContents());
        // console.log("current", currentImages);
        // const removed = AllImages.filter((url) => !currentImages.includes(url))
        const removed = [];
        AllImages.forEach((url) => {
            if (!currentImages.includes(url)) {
                removed.push(url);
            }
        })

        if (removed.length > 0) {
            setremovedimages((prev) => [...prev, ...removed])
        }
        // console.log("removed" + removedImages);
        const undoImages = [];
        removedImages.forEach((url) => {
            if (currentImages.includes(url)) {
                undoImages.push(url)
            }
        })
        // console.log("undo", undoImages)
        if (undoImages.length > 0) {
            const updatedremove = removedImages.filter((Url) => !undoImages.includes(Url))
            // console.log('updatedremove', updatedremove);
            setremovedimages(updatedremove);
        }
        // console.log("updated remove images", removedImages);
        setAllImages(currentImages);
        setText(content);
        // console.log("All images" + AllImages);
        // console.log("Updated removed Images" + removedImages);
    };

    const extractImageUrls = (delta) => {
        const urls = [];

        delta.forEach((op) => {
            if (op.insert && op.insert.image) {
                urls.push(op.insert.image);
            }
        });

        return urls;
    };

    const removeImagesFromServer = async (imageUrls) => {
        try {
            await axios.post(`${BASE_URL}/request/remove-images`, { imageUrls });
            console.log('Images removed from the server:', imageUrls);
        } catch (error) {
            console.log(error);
        }
    };
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ align: [] }],
                    ['link', 'image'],
                ],
                handlers: {
                    image: handleQuillImageHandler,
                },
            },
        }),
        []
    );


    const [title, setTitle] = useState('');
    const [Desc, setDesc] = useState('');
    const [isLoading, setIsloading] = useState(false);

    const userId = useSelector((state) => state.UserInfo.CurrentUserdetails._id);
    const handletitle = (e) => {
        setTitle(e.target.value);
    }
    const handledescription = (e) => {
        setDesc(e.target.value);
    }
    const Addpost = async () => {
        if (title === '' || Desc === '' || text === '') {
            return toast('All Fields are Mandatory');
        }
        setIsloading(true);
        const { data } = await axios.post(`${BASE_URL}/request/addpost`, {
            text,
            title,
            Desc,
            userId,
        });

        console.log(data);
        removeImagesFromServer(removedImages);
        if (data.status === 200) {
            await axios.put(`${BASE_URL}/request/user/${userId}/reputation`)
            await axios.put(`${BASE_URL}/request/academicpost/${data.post._id}/reputation`)
            setPosted(true);
        }
        setIsloading(false);
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className="custommodal_acad"
            shouldCloseOnOverlayClick={true}
            overlayClassName="custom-overlay"
        >
            {
                posted ? (
                    <TQModal closeModal={closeModal} message="Thank you for Post , This will definetly Help other Students" />
                ) : (
                    <div>
                        <div className='py-2'>
                            <GrClose onClick={closeModal} className=' cursor-pointer mb-2 float-right' />
                            <textarea style={{ resize: 'none' }} onChange={handletitle} className='w-[100%] border-b focus:outline-none' value={title} placeholder='Title' />
                            <textarea style={{ resize: 'none' }} onChange={handledescription} className='w-[100%] border-b focus:outline-none' value={Desc} placeholder='Small Overview' />
                            <div className='h-[400px] mb-20'>
                                <ReactQuill
                                    className='h-[90%]'
                                    ref={quillRef}
                                    value={text}
                                    onChange={handleQuillTextChange}
                                    modules={modules}
                                />
                            </div>
                        </div>
                        <div className="flex pb-5 float-right mr-5 gap-5 items-center">
                            <div className="cancelques cursor-pointer" onClick={closeModal}>
                                cancel
                            </div>
                            <div
                                onClick={Addpost}
                                className="submitquesbtn cursor-pointer   bg-red-700 hover:bg-red-800 text-white py-1 px-4 rounded-2xl">
                                {
                                    isLoading ? (
                                        <div className="flex justify-center px-8 py-1">
                                            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 h-4 w-4"></div>
                                        </div>
                                    )
                                        : (
                                            <span>
                                                Add Post
                                            </span>
                                        )
                                }
                            </div>
                        </div>
                        <ToastContainer />
                    </div>
                )
            }
        </Modal>
    )
}

export default AddAcdemichelpModal