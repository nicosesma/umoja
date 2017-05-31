import React, {Component} from 'react'

import $ from 'jquery'

import './stylesheets/Vendors.css'

// TODO: See how to integrate the reserved property from props with the state

class VendorSpot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reserved: this.props.reserved,
      reservation_user_id: this.props.user_id,
      user_reservation: this.props.user_reservation
    }

    this.clickOnSpot = this.clickOnSpot.bind(this)
  }

  clickOnSpot(event) {
    event.preventDefault()
    const {reserved, reservation_user_id} = this.state
    const {spot_id, user_id, current_user_id} = this.props
    console.log('id clickOnSpot', spot_id)

    if (reserved) {
      if (reservation_user_id === current_user_id){
        console.log('Success user_ids match!!')
        return $.ajax({
          method: 'POST',
          url: '/api/reserve/cancel',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          data: JSON.stringify({
            id: spot_id,
            reserved: !this.state.reserved
          })
        }).then(cancel_result => {
          console.log('cancel_result', cancel_result)
          this.setState({
            reserved: !this.state.reserved,
            user_reservation: !this.state.user_reservation
          })
        })
      }
    }

    if (!reserved) {
      // this.setState({
      //   reserved: !this.state.reserved
      // })
      this.setState({
        user_reservation: !this.state.user_reservation
      })

      return $.ajax({
        method: 'POST',
        url: '/api/reserve',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
          id: spot_id,
          // user_id,
          reserved: true
        })
      }).then(result => {
        console.log('result', result)
        this.setState({
          reserved: !this.state.reserved,
          reservation_user_id: result.user_id
        })
      })
    }
  }

  render() {
    if (this.state.user_reservation) {
      return <div className={`VendorSpot userSpot`} onClick={e => this.clickOnSpot(e)}>
    </div>
    }

    const className = this.state.reserved
      ? 'reservedSpot'
      : 'availableSpot'

    return <div className={`VendorSpot ${className}`} onClick={e => this.clickOnSpot(e)}>
    </div>
  }
}

export default VendorSpot
