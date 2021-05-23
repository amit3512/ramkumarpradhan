

const UpdateUser = ({
    handleDate,
        handleName,
        handlePhone,
        handleDesc,
        handleTake,
        handleBrief,
        handleGive,
        handleRemain,
        date,
        name,
        phone,
        desc,
        take,
        give,
        remain,
        brief,
        handleSubmit
}) =>{


return(
<div className="container">
    <div className="row mt-5">
        <div className="col-md-4"></div>
            <div className="col-md-4 border">
            <form>
                        <div className="form-group">
                        
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Date" name="date" value={date} onChange={handleDate}/>
                        
                        </div>
                        <div className="form-group">
                        
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Name" name="name" value={name} onChange={handleName}/>
                        
                        </div>
                        <div className="form-group">
                        
                        <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Phone No." name="phone" value={phone} onChange={handlePhone}/>
                        
                        </div>
                        {/* <div className="form-group">
                        <label for="formGroupExampleInput3">Room No.</label>
                        <CKEditor 
                        editor={ ClassicEditor }
                        data={this.state.description} 
                        onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.setState({
                            description: data,
                        })
                        console.log( { event, editor, data } );
                    } }/>
                        
                        </div> */}

                        <div className="form-group">
                                    
                                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Kaam ko Bibaran" 
                                    name="desc" value={desc} onChange={handleDesc}/>
                                    
                        </div>
                        
                        <div className="form-group">
                        
                        <input type="text" className="form-control" id="formGroupExampleInput4" placeholder="Aafuley Liney" name="take" value={take} onChange={handleTake}/>
                        
                        </div>
                        <div className="form-group">
                        
                        <input type="text" className="form-control" id="formGroupExampleInput5" placeholder="Aafule Diney" name="give" value={give} onChange={handleGive}/>
                        
                        </div>
                        <div className="form-group">
                        
                        <input type="text" className="form-control" id="formGroupExampleInput6" placeholder="Baaki" name="remain" value={remain} onChange={handleRemain}/>
                        
                        </div>
                        <div className="form-group">
                        
                        <select type="text" className="form-control" id="formGroupExampleInput7" placeholder="Disakeko,Baaki" name="brief" value={brief} onChange={handleBrief}>
                            <option defaultValue="">Choose</option>
                            <option value="Paid">Paid</option>
                            <option value="Remain">Remain</option>
                            </select>
                        
                        </div>
                        <button className="btn btn-success my-3" type="submit" onClick={handleSubmit}>Submit</button>
            </form>

        </div>
    </div>
    

</div>

)
}

export default UpdateUser;