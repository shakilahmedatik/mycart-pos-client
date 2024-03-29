import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Table, Button, Modal, Form, Input, Select, message } from 'antd'
import DefaultLayout from '../components/DefaultLayout'
import { EyeOutlined } from '@ant-design/icons'
import '../assets/styles/bills.css'
import { useReactToPrint } from 'react-to-print'

const Bills = () => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  const [printBillModalVisibility, setPrintBillModalVisibility] =
    useState(false)
  const [selectedBill, setSelectedBill] = useState(null)

  const dispatch = useDispatch()
  const [bills, setBills] = useState([])
  const getAllBills = () => {
    dispatch({ type: 'showLoading' })
    axios
      .get('/api/bills/get-all-bills')
      .then(response => {
        dispatch({ type: 'hideLoading' })
        const data = response.data
        data.reverse()
        setBills(data)
      })
      .catch(err => {
        dispatch({ type: 'hideLoading' })
        console.log(err)
      })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getAllBills(), [])
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
    },
    {
      title: 'SubTotal',
      dataIndex: 'subTotal',
    },
    {
      title: 'Tax',
      dataIndex: 'tax',
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <EyeOutlined
          onClick={() => {
            setSelectedBill(record)
            setPrintBillModalVisibility(true)
          }}
        />
      ),
    },
  ]
  const cartColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: '_id',
      render: (id, record) => <b>{record.quantity}</b>,
    },
    {
      title: 'Total Fare',
      dataIndex: '_id',
      render: (id, record) => <b>{record.quantity * record.price}</b>,
    },
  ]
  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
        <h3>Bills</h3>
      </div>
      <Table columns={columns} dataSource={bills} rowKey='_id' bordered />
      {printBillModalVisibility && (
        <Modal
          width={800}
          onCancel={() => {
            setPrintBillModalVisibility(false)
          }}
          visible={printBillModalVisibility}
          title='Bill Details'
          footer={false}
        >
          <div className='bill-model p-4' ref={componentRef}>
            <div className='d-flex justify-content-between bill-header pb-2'>
              <div>
                <h1>
                  <b>Walmart</b>
                </h1>
              </div>
              <div>
                <p>17/09 Yangzhou</p>
                <p>Jiangsu</p>
                <p>China</p>
              </div>
            </div>
            <div className='bill-customer-details mt-2'>
              <p>
                <b>Name</b> : {selectedBill.customerName}
              </p>
              <p>
                <b>Phone Number</b> : {selectedBill.phoneNumber}
              </p>
              <p>
                <b>Date</b> :{' '}
                {selectedBill.createdAt.toString().substring(0, 10)}
              </p>
            </div>
            <Table
              columns={cartColumns}
              dataSource={selectedBill.cartItems}
              rowKey='_id'
              bordered
              pagination={false}
            />
            <div className='dotted-border my-2'>
              <p>
                <b>SUB TOTAL</b> : {selectedBill.subTotal}
              </p>
              <p>
                <b>TAX</b> : {selectedBill.tax}
              </p>
            </div>
            <div className='my-2'>
              <h2>
                <b>GRAND TOTAL</b> : {selectedBill.total}
              </h2>
            </div>
          </div>
          <div className='d-flex print-btn justify-content-end'>
            <Button onClick={handlePrint} type='primary'>
              Print Bill
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  )
}

export default Bills
