// import React from 'react'
// const Style = {
//         // modal_confirm: {
//         // color: "#434e65",
//         // width: "525px"
//         // },
//         // modal_confirm: {
//         //     color: "#636363",
//         //     width: "325px",
//         //     fontSize: "14px"
//         // },
//         // modal_confirm:, modal_content: {
//         //     padding: "20px",
//         //     borderRadius: "5px",
//         //     border: none
//         // },

//         // modal_confirm ,modal_header: {
//         //     borderbottom: none,
//         //     position: relative
//         // },

//         // modal_confirm, h4: {
//         //     textalign: center,
//         //     fontsize: "26px",
//         //     margin: "30px, 0, -15px"
//         // },
//         // modal_confirm, h5 :{
//         //     text_align: center,
//         //     font_size: "26px",
//         // },

//         // modal_confirm ,form_control,
//         // modal_confirm, btn: {
//         //     minheight: "40px",
//         //     borderradius: "3px"
//         // },
//         // modal_confirm, close: {
//         //     position: absolute,
//         //     top: "-5px",
//         //     right: "-5px"
//         // },
//         // modal_confirm,modal_footer: {
//         //     border: none,
//         //     textalign: center,
//         //     borderradius: "5px",
//         //     fontsize: "13px",
//         // },
//         // modal_confirm ,icon_box: {
//         //     color: "#fff",
//         //     position: absolute,
//         //     margin: 0, auto,
//         //     left: 0,
//         //     right: 0,
//         //     top: "-70px",
//         //     width: "95px",
//         //     height: "95px",
//         //     borderradius: "50%",
//         //     z_index: 9,
//         //     background: "#007bff",
//         //     padding: "15px",
//         //     textalign: center,
//         //     boxshadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
//         // }

//         // .modal-confirm ,icon_box i {
//         //     font-size: 58px;
//         //     position: relative;
//         //     top: 3px;
//         // }

//         // .modal-confirm.modal-dialog {
//         //     margin-top: 110px;
//         //     margin-left:auto;
//         //     margin-right:auto;
//         //     margin-bottom:auto;
//         // }

//         // .modal-confirm .btn {
//         //     color: #fff;
//         //     border-radius: 4px;
//         //     background: #007bff;
//         //     text-decoration: none;
//         //     transition: all 0.4s;
//         //     line-height: normal;
//         //     border: none;
//         // }

//         // .modal-confirm .btn:hover,
//         // .modal-confirm .btn:focus {
//         //     background: #007bff;
//         //     outline: none;
//         // }

//         // .trigger-btn {
//         //     display: inline-block;
//         //     margin: 100px auto;
//         // }
// }
// const Confirm = () => {
//     return (
//         <div id='confirmed' className='modal fade'>
//         <div className='modal-dialog modal-confirm'>
//             <div className='modal-content'>
//             <div className='modal-header'>
//                 <div className='icon-box'>
//                 <i className='material-icons'>&#xE876;</i>
//                 </div>
//                 <h4 className='modal-title w-100'>Redeem Procesed</h4>
//             </div>
//             <div className='modal-body'>
//                 <p className='text-center'>Pesanan Anda diterima dan sedang diproses oleh sistem</p>
//                 <table>
//                 <tr>
//                     <td>Nama </td>
//                     <td>: Rick Zolenda</td>
//                 </tr>
//                 <tr>
//                     <td>Jenis Rekening </td>
//                     <td>: BCA</td>
//                 </tr>
//                 <tr>
//                     <td>Nomor Rekening </td>
//                     <td>: 091721923123</td>
//                 </tr>
//                 <tr>
//                     <td>Gift Card Value(Crypto) </td>
//                     <td>: 1000 TRX</td>
//                 </tr>
//                 <tr>
//                     <td>Gift Card Value(IDR)</td>
//                     <td>: Rp 837.985</td>
//                 </tr>
//                 <tr>
//                     <td>Jumlah Diterima(+fee) </td>
//                     <td>: Rp 100.000</td>
//                 </tr>
//                 </table>
//                 <div role={'separator'} className={'dropdown-divider'} />
//                 <p className='text-center'>ID Transaksi</p>
//                 <input type='text' className='form-control' value='123456789' readOnly />
//                 <h5>IST-09812918391</h5>
//             </div>
//             <div className='modal-footer'>
//                 <button className='btn btn-success btn-block' data-dismiss='modal'>Check Status Transaksi</button>
//             </div>
//             </div>
//         </div>
//     </div>
//     )
// }
// Confirm.getLayout = function getLayout(page) {
//     return <Confirm>{page}</Confirm>;
// };
// export default Confirm;
