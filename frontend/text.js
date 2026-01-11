<div className={className}>
      <div className="column-title"> 
        {isEditing ? ( 
          <Input 
            $margin="10px 10px 0 0" 
            type="text" 
            value={title} 
            autoFocus 
            onChange={(e) => setTitle(e.target.value)} 
            onBlur={handleSave} 
            onKeyDown={handleKeyDown} />
            ) : (
                <h3>{column.title}</h3>
                )}
                {!isEditing && ( 
                  <> 
                  <div className="edit-menu"> 
                    <Button id="demo-positioned-button" 
                      aria-controls={open ? 'demo-positioned-menu' : undefined} 
                      aria-haspopup="true" aria-expanded={open ? 'true' : undefined} 
                      onClick={handleClick} > <MoreHorizIcon /> 
                    </Button> 
                    <Menu id="demo-positioned-menu" 
                      aria-labelledby="demo-positioned-button" 
                      anchorEl={anchorEl} 
                      open={open} 
                      onClose={handleClose} 
                      anchorOrigin={{ vertical: 'top', horizontal: 'left', }} 
                      transformOrigin={{ vertical: 'top', horizontal: 'left', }} > 
                    <MenuItem onClick={handleEdit} > 
                      <ListItemText>Edit</ListItemText> 
                      <ListItemIcon> <EditOutlinedIcon/> </ListItemIcon> 
                    </MenuItem> 
                    <MenuItem onClick={handleDelete}> 
                      <ListItemText>Delete</ListItemText> 
                      <ListItemIcon> 
                        <DeleteOutlineIcon/> 
                      </ListItemIcon> 
                    </MenuItem> 
                    </Menu> 
                    </div> 
                    </> 
                  )}
            </div> 

          <div className="tasks"> 
            <div className="task-list"> 
              {columnTasks.map(task => 
              <Task key={task.id} task={task} />) } 
            </div> 
            </div> 
              <Button className="add-task-btn" 
                variant="text" 
                size="small" 
                startIcon={<AddOutlinedIcon/>} 
                onClick={handleAddTask}> Add new task</Button> 
            </div> ) }
